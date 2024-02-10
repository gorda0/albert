import { WashStore, Wash, ScheduleWashDto } from "@models/wash";
import WashService from "@services/wash";
import { useImmer } from "use-immer";

const useWashStore = (washes: WashStore) => {
  const [washState, setWashState] = useImmer(washes);

  const popErrors = () =>
    setWashState((draft) => {
      if (draft.errors.length) draft.errors = draft.errors.slice(0, -1);
    });

  const cleanErrors = () =>
    setWashState((draft) => {
      draft.errors = [];
    });
  
    const pushError = (message: string) => {
      setWashState(draft => {
        draft.errors.push({ message });
      })
    }

  const fetchWashes = () => {
    WashService.listWashes().then((washes) => {
      setWashState((draft) => {
        draft.washes = washes;
      });
    });
  };

  const listAvailableCalendar = () => {
    WashService.listAvailableCalendar().then((calendars) => {

      setWashState((draft) => {
        draft.calendars = calendars;
      });
    });
  };

  const scheduleWash = (body: ScheduleWashDto, cb: () => void) => {
    WashService.scheduleWash(body).then((washes) => {
      fetchWashes();

      cb();
    });
  };

  const confirmWash = (washId: string) => {
    WashService.confirmWash(washId).then(fetchWashes);
  };

  const cancelWash = (washId: string) => {
    WashService.cancelWash(washId).then(fetchWashes);
  };

  return {
    ...washState,
    setWashState,
    popErrors,
    cleanErrors,
    fetchWashes,
    scheduleWash,
    confirmWash,
    cancelWash,
    listAvailableCalendar,
    pushError
  };
};

export default useWashStore;
