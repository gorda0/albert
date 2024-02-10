import { useContext, useEffect, useState } from "react";
import { Pressable, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import MaskInput, { Masks } from "react-native-mask-input";
import colors from "@constants/colors";

import { ScheduleWashDto, Wash, WashType } from "@models/wash";
import { SelectList } from "react-native-dropdown-select-list";
import { Input, Label } from "./styles";
import { WashContext } from "@contexts/WashContext";

interface WashFormProps {
  updateTempMethod: (method: () => void) => void;
  onSubmit: (data: ScheduleWashDto) => void;
}

const isValidPlate = (plate: string) =>
  plate.match("[A-Z]{3}[0-9][0-9A-Z][0-9]{2}");

const WashForm = ({ onSubmit, updateTempMethod }: WashFormProps) => {
  const { calendars, pushError } = useContext(WashContext);

  const [washType, setWashType] = useState(WashType.COMPLETE);

  const [washHour, setWashHour] = useState("");
  const [washDay, setWashDay] = useState("");

  const initialFormState = {
    plate: "",
  };

  const [formState, setFormState] = useState(initialFormState);

  const setFormValue = (key: keyof typeof formState, value: string) =>
    setFormState({
      ...formState,
      [key]: value,
    });

  useEffect(() => {
    updateTempMethod(() => {
      if (isValidPlate(formState.plate))
        onSubmit({
          ...formState,
          type: washType,
          date: washDay,
          hour: washHour,
        });
      else pushError("Placa inválida!")
    });
  }, [formState, washType, washDay, washHour]);

  return (
    <View>
      <Label>Placa</Label>
      {/* <Input
        onChangeText={setFormValue("plate")}
        defaultValue={initialFormState.plate}
      /> */}

      <Input
        value={formState.plate}
        onChangeText={(masked: string) => {
          setFormValue("plate", masked);
        }}
        mask={Masks.BRL_CAR_PLATE}
      />
      <Label>Tipo</Label>
      <View style={{ zIndex: 1005 }}>
        <SelectList
          search={false}
          setSelected={setWashType}
          data={[
            { value: "Completa", key: WashType.COMPLETE },
            { value: "Simples", key: WashType.SIMPLE },
          ]}
          save="key"
          defaultOption={{ value: "Completa", key: WashType.COMPLETE }}
        />
        {/* <DropDownPicker
          open={washTypePicker}
          value={washType}
          items={[
            { label: "Completa", value: WashType.COMPLETE },
            { label: "Simples", value: WashType.SIMPLE },
          ]}
          setOpen={setWashTypePicker}
          setValue={setWashType}
          disabledStyle={{ backgroundColor: colors.grayLight }}
          style={{ borderWidth: 0 }}
          labelStyle={{ fontSize: 18, color: colors.grayBold }}
          closeOnBackPressed
          placeholderStyle={{ fontSize: 18, color: colors.grayBold }}
          dropDownContainerStyle={{ borderWidth: 0.5 }}
          zIndex={3000}
          zIndexInverse={1000}
        /> */}
      </View>
      <Label>Dia</Label>
      <View style={{ zIndex: 1004 }}>
        <SelectList
          search={false}
          setSelected={setWashDay}
          placeholder="Selecione um dia"
          data={(calendars ?? []).map(({ date }) => ({
            key: date,
            value: new Date(date).toLocaleDateString(),
          }))}
          save="key"
          defaultOption={
            (calendars ?? []).map(({ date }) => ({
              key: date,
              value: new Date(date).toLocaleDateString(),
            }))[0]
          }
        />
      </View>
      <Label>Hora</Label>
      <View style={{ zIndex: 1003 }}>
        <Pressable disabled={washDay === ""}>
          <SelectList
            placeholder="Selecione um horário"
            search={false}
            setSelected={setWashHour}
            data={(
              (calendars ?? []).find((calendar) => calendar.date === washDay)
                ?.slots ?? []
            ).map((slot) => ({ key: slot, value: slot }))}
            save="key"
          />
        </Pressable>
      </View>
    </View>
  );
};

export default WashForm;
