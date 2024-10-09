export interface IDeliveryDetails {
  basics?: IBasics;
  videos: IVideo[];
}

export interface IBasics {
    title: string
    status: number
    startsAt: string
    endsAt: string
    monitorsCount: number
    duration: number
    rewardPoint: number
    includeCondition: string
    excludeCondition: string
    industries: any[]
    gender: number
    maritalStatus: number
    hasChildren: number
    occupation: any[]
    prefectures: any[]
    hasScreening: boolean
    screeningId: string
    timeslotsList: ITimeslotsList[]
    monitorsDetails: IMonitorsDetail[]
    timezone: string
    ngIndustries: any[]
    personalIncomeStart: number
    personalIncomeEnd: number
    householdIncomeStart: number
    householdIncomeEnd: number
    ageFrom: number
    ageTo: number
    id: string
    defaultLanguageId: string
}

export interface IVideo {
  recordingId: string
  recordingLink: string
  recordingName: string
  recordingStartTime: string
  recordingEndTime: string
  meetingId: string
  monitorId: string
  screeningId: string
  monitorName: string
  recordingDuration: number
  monitorDetails: IMonitorDetails
  memo: string
}

export interface ITimeslotsList {
  startTime: string
  endTime: string
  id: string
  status: number
  type: number
}

export interface IMonitorsDetail {
  id: string
  status: number
  timeSlotDetails: ITimeSlotDetails
  memo: string
  unreadCount: number
}

export interface ITimeSlotDetails {
  id: string
  startTime: string
  endTime: string
  status: number
  consumedStatus: number
  type: number
}

export interface IMonitorDetails {
  id: string
  nickName: string
  createdAt: string
  updatedAt: string
  profileLanguageId: string
  isMarried: number
  hasChildren: number
  age: number
  ageCode: number
  numHousemate: number
  hasHousemateParent: number
  hasHousemateSibling: number
  hasMobileServiceProvider2: number
  hasDriverLicense: number
  hasOwnCar: number
  hasDrinkingHabit: number
  gender: number
  prefecture: string
  area: string
  occupation: string
  industry: string
  firstName: string
  lastName: string
  noOfAttempts: number
  lockReleasedAt: string
  phoneNumber: string
  personalIncome: string
  householdIncome: string
  studentType: number
  hasHousematePartner: number
  hasHousemateChild: number
  hasHousemateGrandparent: number
  hasHousemateOtherFamily: number
  hasHousemateEtc: number
  numChild: number
  hasHousemateGrandson: number
  birthOldestChild: string
  birthOldestChildMmdd: string
  ageOldestChild: number
  birthYoungestChild: string
  birthYoungestChildMmdd: string
  ageYoungestChild: number
  hasMobileServiceProvider1: number
  hasMobileServiceProvider3: number
  hasMobileServiceProvider4: number
  hasMobileServiceProvider5: number
  financialAsset: number
  useSns1: number
  useSns2: number
  useSns3: number
  useSns4: number
  useSns5: number
  email: string
  mid: string
}


export interface IScreeningMonitorDetails {
  monitor: IMonitor
  screening: IScreening[]
}

export interface IMonitor {
  name: string
  prefecture: string
  area: string
  occupation: string
  gender: string
  age: string
}

export interface IScreening {
  question: string
  type: number
  answers: string[]
}
