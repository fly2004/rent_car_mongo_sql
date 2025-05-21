export interface Rental {
    id: string;
    carId: string;
    customerId: string;
    startDate: string;   // ISO format
    endDate: string;
    totalCost: number;
    status: 'active' | 'completed' | 'cancelled';
}
