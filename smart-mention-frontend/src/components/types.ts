export interface Message {
  text: string;
  time: string;
  fromBot?: boolean;
  group: string;
  username?: string;
}
