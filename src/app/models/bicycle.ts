
export interface Station {
    id: number;
    location: string;
    capacity: number;
    address: string;
  }
  

  export interface Bicycle {
    id: number;
    serialnumber: string;
    model: string;
    status: string;
    station: Station;
  }
  

  export interface Client {
    id: number;
    name: string;
    address: string;
    email: string;
    phone: string;
  }
  

  export interface Maintenance {
    id: number;
    bicycle: Bicycle;
    description: string;
    priority: string;
    status: string;
    datescheduled: string;
    completedDate: string;
    notes: string;
    assignedTo: string;
  }
  

  export interface Ride {
    id: number;
    client: Client;
    bicycle: Bicycle;
    start_time: string;
    end_time: string;
    date: string;
  }
  