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
  titleSave:string,
  footer?:{
    title:{
      text:string,
      x:number,
      y:number,
      options:any
    },
    name:{
      text:string,
      x:number,
      y:number,
      options:any
    }
  }
}

const useGeneratePdf = ({tableColumn,tableRows,additionalOptions, title, titleSave, footer}:Params) => {
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

  if(footer){
    doc.text(footer.title.text,footer.title.x,footer.title.y,footer.title.options)
    doc.text(footer.name.text,footer.name.x,footer.name.y,footer.name.options)
  }

  doc.save(titleSave);
};

export default useGeneratePdf;