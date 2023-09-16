export interface SelectItems {
    id: number;
    value: string | number;
    label: string;
    children?: SelectItems[];
}

export interface AcountInfo {
    id: number;
    type: number;
    date: string;
    money: number;
    note: string;
  }

  export interface AcountTableDetail {
    year: string;
    month: string;
  }