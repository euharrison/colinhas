import { forwardRef } from "react";
import { closeDialog, Dialog, DialogRef } from "../components/Dialog";
import { Instrument } from "../database/types";
import { InstrumentList } from "./InstrumentList";

type Props = {
  selectedItem?: Instrument;
  onSelect: (instrument: Instrument) => void;
};

export const InstrumentDialog = forwardRef<DialogRef, Props>(
  ({ selectedItem, onSelect }, ref) => {
    return (
      <Dialog ref={ref} title="Instrumento">
        <InstrumentList
          selectedItem={selectedItem}
          onSelect={(instrument) => {
            onSelect(instrument);
            closeDialog(ref);
          }}
        />
      </Dialog>
    );
  },
);
