import { useState } from "react";

const useForceUpdate = () => {
    const [state, setState] = useState(true);
    return () => setState(!state)
}
export default useForceUpdate;