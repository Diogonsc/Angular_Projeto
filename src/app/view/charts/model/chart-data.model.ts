export class ChartDataModel {
    constructor(
        public summarizeValueCounter? : number,
        public summarizeValueAllProductsValue? : string,
        public summarizeValueAllProductsValueWhereTaxIsMonofasica? : string,
        public summarizeValueAllProductsValueWhereTaxIsNormal? : string,
        public summarizeValueAllProductsValueWhereTaxIsAliqZero? : string,
        public valorPis? : string,
        public valorCofins? : string,
        public summarizeValueWhereTaxIsMonofasicaCounter? : number,
        public summarizeValueWhereTaxIsNormalCounter? : number,
        public summarizeValueWhereTaxIsAliqZeroCounter? : number,
        public bonusExit? : string,
        public bonusEntrance? : string,
        public onusExit? : string,
        public onusEntrance? : string,
        public subtotalAliqZero? : string,
        public subtotalMonofasica? : string,
        public countNcmNull? : number,
        public calcBaseBonus? : string,
        public cofinsBonus? : string,
        public pisBonus? : string,
        public calcBaseOnus? : string,
        public pisOnus? : string,
        public cofinsOnus? : string
    ){}

}

