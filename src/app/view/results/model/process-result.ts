export interface ProcessResultModel {
  content: [{
    processResultId? : {
      codItem? : string,
      ncmNumber? : string,
      cst_pis? : string,
      insumos? : string,
      descItem? : string
    },
    descItem? : string,
    taxType? : string,
    totalItemValue? : string
  }],
  totalPages: number
}
