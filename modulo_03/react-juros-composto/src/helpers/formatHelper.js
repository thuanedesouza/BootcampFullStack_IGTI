const formatCurrency = (value) => {
    return Intl.NumberFormat('pt-br', {style: 'currency', currency: 'BRL'}).format(value)
  }


  const formatter = Intl.NumberFormat('pt-BR')
function formatNumber(value){
    return formatter.format(value);
}

export  { formatNumber } ;
  const formatPercent = value => {
    return value.toFixed(2).replace('.', ',') + '%'
  }
  
  export { formatNumber, formatPercent,formatCurrency }