import jsPDF from "jspdf";
import autoTable from 'jspdf-autotable';
import moment from 'moment';

interface Params {
  tableColumn:any[],
  tableRows:any[],
  additionalOptions:any,
  title?:{
    text:string,
    x:number,
    y:number,
    options:any
  }
  titleSave:string
}

const useGeneratePdf = ({tableColumn,tableRows,additionalOptions, title, titleSave}:Params) => {
  const doc = new jsPDF();

  const options = {
    head:[tableColumn], 
    body:tableRows,
    theme: "grid",
  }

  autoTable(doc,{...options,...additionalOptions});

  if(title){
    doc.text(title.text,title.x,title.y,title.options)
  }

  doc.save(titleSave);
};

export default useGeneratePdf;