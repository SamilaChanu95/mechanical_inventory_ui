export class Product {
    id: number;
    bajajCode: string;
    productName: string;
    manufacturerYear: Date;
    quantity: number;
    qualityLevel: number;
    sellingPrice: number;
    purchasePrice: number;

    constructor(id: number = 0, bajajCode: string = '', productName: string = '', manufacturerYear: Date = new Date(), quantity: number = 0, qualityLevel: number = 0, sellingPrice: number = 0, purchasePrice: number = 0) {
        this.id = id,
        this.bajajCode = bajajCode,
        this.productName = productName,
        this.manufacturerYear = manufacturerYear,
        this.quantity = quantity,
        this.qualityLevel = qualityLevel,
        this.sellingPrice = sellingPrice,
        this.purchasePrice = purchasePrice
    }
}
