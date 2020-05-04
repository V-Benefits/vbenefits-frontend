export class RoundModel{
    name:string;
    startDate: Date;
    endDate: Date;
}

export class PensionRequestModel{
    approvedOn: Date
    band: string
    beginingBalance: number
    costCenter: string
    currentAvailableBalance: number
    currentyearContribution: number
    hiringDate: Date
    id: number
    income: number
    isActive: boolean
    isApproved: boolean
    isEligible: boolean
    lastRoundWithdrawal: number
    maxWithdrawalAmount: number
    name: string
    proratedNewContribution: number
    rejectedOn: Date
    requestedBy: null
    requestedById: 1
    requestedOn: Date
    staffId: number
    subBand: string
    tenure: number
    vestedBalance: number
    vestingPercent: number
    withdrawalAmmount: number
}