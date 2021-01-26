import { Dispatch, SetStateAction } from "react";
import { CollectionStateInterface } from "./collection";

export interface AppDrawerInterface {
  classes: Record<any, string>;
  open: boolean;
  collectionsState: CollectionStateInterface[];
  setCollectionsState: Dispatch<SetStateAction<CollectionStateInterface[]>>;
  getInventories: (collectionId: number) => void;
  openCreateCollectionDialog: () => void;
  handleDrawerClose: () => void;
  onLogoutClick: () => void;
}

export interface AppBarProps {
  handleDrawerOpen: () => void;
  open: boolean;
  classes: Record<any, string>;
  firstName: string;
  lastName: string
}
