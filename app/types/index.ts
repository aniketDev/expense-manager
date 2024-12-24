import { ImageSourcePropType } from 'react-native';

export interface Member {
  id: string;
  name: string;
}

export interface MembersState {
  data: Member[] | undefined;
  isLoading: boolean;
  error: string | null;
  selectedMembers: Member[];
}

export interface GroupData {
  id?: string;
  title?: string;
  image?: string;
  amount?: number;
  members?: Member[];
}

export interface GroupCardData {
  id?: string;
  title?: string;
  image?: ImageSourcePropType;
  amount?: number;
}

export interface StateType {
  members?: MembersState;
  groups?: {
    data?: GroupData[];
    isLoading?: boolean;
    error?: string | null;
  };
}
