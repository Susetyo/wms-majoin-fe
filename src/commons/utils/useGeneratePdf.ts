import jsPDF from "jspdf";
import autoTable from 'jspdf-autotable';
import Logo from '@/assets/logo.png'

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
  const pageWidth = doc.internal.pageSize.width || doc.internal.pageSize.getWidth();

  const options = {
    head:[tableColumn], 
    body:tableRows,
    theme: "grid",
  }

  doc.setFontSize(16)
  doc.text('PT. MAJOIN CONESS INDONESIA', pageWidth/2-35, 14)
  doc.setFontSize(14)
  doc.text('Jalan Teluk Cendrawasih No. 1, RT. 01 / RW. 01', pageWidth/2-35, 22)
  doc.text('Kel. Arjosari, Kec. Blimbing, Kota Malang', pageWidth/2-35, 30)
  doc.text('Telp. 0341 4379461, Mobile. 087780483779', pageWidth/2-35, 38)
  doc.text('email : infomajoinconess15@gmail.com', pageWidth/2-35, 46)
  doc.addImage(Logo, 'JPEG', 20, 10, 40, 40)
  doc.line(10, 52, pageWidth-10, 52);
  doc.setLineWidth(1.5);
  doc.line(10, 54, pageWidth-10, 54);

  if(title){
    doc.setFontSize(16)
    doc.text(title.text,title.x,title.y,title.options)
  }

  doc.setFontSize(14)
  autoTable(doc,{...options,...additionalOptions});


  if(footer){
    doc.text(footer.title.text,footer.title.x,footer.title.y,footer.title.options)
    doc.text(footer.name.text,footer.name.x,footer.name.y,footer.name.options)
  }

  doc.save(titleSave);
};

export default useGeneratePdf;