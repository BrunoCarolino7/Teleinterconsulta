import { useState } from "react";

function useDebounce<T>(callback: (value: T) => void, delay: number): (value: T) => void {

    const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

    return (value: T) => {
        if (timer) {
            clearTimeout(timer);
        }

        const newTimer = setTimeout(() => {
            callback(value);
        }, delay);

        setTimer(newTimer);
    };
}

export default useDebounce;
