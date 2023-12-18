export class DecimalTransformer {
  to (value: number)  {
    return value ;
  }
  from (value: string|number)  {
    return +value ;
  }
}