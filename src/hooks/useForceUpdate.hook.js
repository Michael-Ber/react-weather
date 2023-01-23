import { useState } from "react";

const useForceUpdate = () => {
    const [state, setState] = useState();
    return () => setState(!state)
}
export default useForceUpdate;