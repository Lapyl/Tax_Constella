export type IRegn = {
  id: string;
  name: string;
  owner: string;
  result: Record<string, number>;
  startSnapshotOrdinal: number;
  endSnapshotOrdinal: number;
  status: 'Closed' | 'Open';
};
