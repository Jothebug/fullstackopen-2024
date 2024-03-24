import {
  forwardRef,
  memo,
  useCallback,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";

const Toggle = forwardRef(({ children, label }, ref) => {
  const [isVisible, setVisible] = useState(false);

  const onToggleVisibility = useCallback(() => {
    setVisible((prev) => !prev);
  }, []);

  const { hideWhenVisible, shownWhenVisible } = useMemo(() => {
    const hideWhenVisible = { display: isVisible ? "none" : "" };
    const shownWhenVisible = { display: isVisible ? "" : "none" };

    return { hideWhenVisible, shownWhenVisible };
  }, [isVisible]);

  useImperativeHandle(ref, () => ({ onToggleVisibility }), [
    onToggleVisibility,
  ]);

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={onToggleVisibility}>{label}</button>
      </div>
      <div style={shownWhenVisible}>{children}</div>
    </div>
  );
});

Toggle.displayName = "Toggle";
export default memo(Toggle);
