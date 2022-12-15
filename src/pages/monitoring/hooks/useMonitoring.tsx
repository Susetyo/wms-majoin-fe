import { useQuery, useQueryClient } from "@tanstack/react-query";
import barangService from "../services/barang.service";
import { message } from "antd";
import React, { useEffect, useState } from "react";
import useDebounce from "@/commons/utils/useDebounce";
import useMonitoringStore from "../store";
import { Form } from "antd";
import moment from "moment";
import useGeneratePdf from "@/commons/utils/useGeneratePdf";
import jsPDF from "jspdf";
import useLoginStore from "@/pages/login/store";

interface IPagination {
  page: number;
  pageSize: number;
}

const useMonitoring = () => {
  const [form] = Form.useForm();
  const LIMIT = 10;
  const { filter, setFilter, setDataTable, dataTable } = useMonitoringStore(
    (state) => state
  );
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5);
  const [searchInput, setSearchInput] = useState<string>("");
  const [offset, setOffset] = useState<number>(0);
  const [open, setOpen] = useState(false);
  const debounce = useDebounce<string>(filter.keyword, 500);
  const { username } = useLoginStore((state) => state);
  const queryClient = useQueryClient();

  const queryMonitoring = useQuery(
    ["queryMonitoring"],
    () => {
      const startDate =
        filter.date?.length > 0
          ? moment(filter.date[0]).format("YYYY-MM-DD")
          : "";
      const endDate =
        filter.date?.length > 0
          ? moment(filter.date[1]).format("YYYY-MM-DD")
          : "";
      let queryUrl = `keyword=${searchInput}&startDate=${startDate}&endDate=${endDate}&type=${
        filter.type ? filter.type : ""
      }&limit=${LIMIT}&offset=${offset}`;

      return barangService({
        url: `${import.meta.env.VITE_REST_URL}/api/transaction?${queryUrl}`,
      });
    },
    {
      onError: (err: any) => {
        message.error(err);
      },
      onSuccess: (res: any) => {
        const injectKey = res.rows.map((r: any, index: number) => ({
          ...r,
          key: `${index}`,
        }));
        setDataTable({ ...res, rows: injectKey });
      },
    }
  );

  useEffect(() => {
    queryClient.removeQueries(["queryMonitoring"], { exact: true });
    queryClient.cancelQueries(["queryMonitoring"], { exact: true });
    queryMonitoring.refetch();
  }, [debounce, page, filter]);

  const onChangePagination = ({ page, pageSize }: IPagination) => {
    setPage(page);
    setPageSize(pageSize);
    setOffset((page - 1) * LIMIT);
  };

  const onChangeSearchInput = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setSearchInput(e.target.value);
    setFilter({ ...filter, keyword: e.target.value });
  };

  const onShowDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    form.resetFields();
    setOpen(false);
  };

  const onChangeRangePicker = (e: any) => {
    console.log(e, "range-picker");
    setFilter({ ...filter, date: e });
  };

  const onSelectType = (e: any) => {
    console.log(e, "select");
    setFilter({ ...filter, type: e });
  };

  const onSubmitFilterSide = async () => {
    const values = await form.validateFields();
    setOpen(false);
    setFilter({ ...filter, date: values?.date, type: values?.type });
  };

  const onGeneratePdf = async () => {
    const startDate =
      filter.date?.length > 0
        ? moment(filter.date[0]).format("YYYY-MM-DD")
        : "";
    const endDate =
      filter.date?.length > 0
        ? moment(filter.date[1]).format("YYYY-MM-DD")
        : "";
    let queryUrl = `startDate=${startDate}&endDate=${endDate}&type=${filter.type}`;

    const getData = await barangService({
      url: `${import.meta.env.VITE_REST_URL}/api/transaction?${queryUrl}`,
    });

    const doc = new jsPDF();
    const pageWidth =
      doc.internal.pageSize.width || doc.internal.pageSize.getWidth();
    const tableColumn = [
      "Nomor",
      "Nama",
      "Qty",
      "Posisi",
      "Date",
      "Type",
      "User",
      "Keterangan",
    ];
    const tableRows: any = getData.rows.map((d: any) => {
      const rowData = [
        d.nomor_material,
        d.nama_material,
        d.qty,
        d.posisi,
        moment(d.date).format("YYYY-MM-DD"),
        d.type,
        d.username,
        d.note,
      ];
      return rowData;
    });
    const additionalOptions = {
      startY: 80,
      theme: "grid",
      styles: {
        font: "times",
        halign: "center",
        cellPadding: 3.5,
        lineWidth: 0.5,
        lineColor: [0, 0, 0],
        textColor: [0, 0, 0],
      },
      headStyles: {
        textColor: [0, 0, 0],
        fontStyle: "normal",
        lineWidth: 0.5,
        lineColor: [0, 0, 0],
        fillColor: [166, 204, 247],
      },
      alternateRowStyles: {
        fillColor: [212, 212, 212],
        textColor: [0, 0, 0],
        lineWidth: 0.5,
        lineColor: [0, 0, 0],
      },
      tableLineColor: [0, 0, 0],
    };

    const title = {
      text: "Report",
      x: pageWidth / 2,
      y: 75,
      options: {
        align: "center",
      },
    };

    const titleSave = `report_${moment(new Date()).format("YYYYMMDDhhmm")}.pdf`;
    useGeneratePdf({
      tableColumn,
      tableRows,
      additionalOptions,
      title,
      titleSave,
    });
  };

  return {
    queryMonitoring,
    page,
    form,
    pageSize,
    open,
    onChangePagination,
    onChangeSearchInput,
    onShowDrawer,
    onClose,
    onChangeRangePicker,
    onSelectType,
    onSubmitFilterSide,
    onGeneratePdf,
  };
};

export default useMonitoring;
