import { useState, useCallback, useRef, useEffect } from "react";
import * as LR from "@uploadcare/uc-blocks";

/*
 * Order of css imports is important. User styles should be loaded after the main theme
 * Or config selector should be more specific.
 *
 * Use minified version because codesandbox can't bundle raw css with relative imports.
 * It's better to use '@uploadcare/uc-blocks/blocks/themes/lr-basic/index.css' instead
 */
import "@uploadcare/uc-blocks/web/lr-basic.min.css";
import st from "./App.module.css";

LR.registerBlocks(LR);

function App() {
  let dataOutputRef = useRef();
  const [files, setFiles] = useState([]);
  const handleUploaderEvent = useCallback((e) => {
    const { data } = e.detail;
    setFiles(data);
  }, []);

  useEffect(() => {
    let el = dataOutputRef.current;
    el.addEventListener("data-output", handleUploaderEvent);
    return () => {
      el.removeEventListener("data-output", handleUploaderEvent);
    };
  }, [handleUploaderEvent]);

  const classNames = ["lr-wgt-common", st.uploaderCfg].join(" ");

  return (
    <div className={st.wrapper}>
      <lr-file-uploader-regular class={classNames}></lr-file-uploader-regular>

      <lr-data-output
        ref={dataOutputRef}
        fire-event
        class={classNames}
        onEvent={handleUploaderEvent}
      ></lr-data-output>

      <div className={st.output}>
        {files.map((file) => (
          <img
            key={file.uuid}
            src={`https://ucarecdn.com/${file.uuid}/-/preview/-/scale_crop/400x400/`}
            width="200"
            alt="Preview"
          />
        ))}
      </div>
    </div>
  );
}

export default App;
