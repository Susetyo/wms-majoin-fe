const uniqueFunc = (params:any[],keyObject:string) => {
  const {length} = params;
  if(length > 0){
    let res:any = [].concat(params[0]);
    let compare:any = {};
    compare[params[0][keyObject]] = 1;

    for(let i = 1; i < length; i++){
      if(compare.hasOwnProperty(params[i][keyObject])){
        compare = {
          ...compare,
          [params[i][keyObject]]: compare[params[i][keyObject]]+1
        }
      }else{
        compare[params[i][keyObject]] = 1;
        res.push(params[i])
      }
    } 

    return res;
  }
    
  return params;
  
}

export default uniqueFunc