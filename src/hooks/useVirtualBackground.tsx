import VirtualBackgroundExtension from "agora-extension-virtual-background";
import AgoraRTC, { ICameraVideoTrack } from "agora-rtc-react";
import { useCallback, useEffect } from "react";

let processor: any = null;

const useVirtualBackground = () => {
  useEffect(() => {
    return () => {
      processor = null;
    };
  }, []);

  const getProcessorInstance = useCallback(
    async (videoTrack: ICameraVideoTrack) => {
      if (!processor) {
        const extension = new VirtualBackgroundExtension();
        // Check browser compatibility virtual background extension

        if (!extension.checkCompatibility()) {
          console.error("Does not support Virtual Background!");
        } else {
          AgoraRTC.registerExtensions([extension]);

          processor = extension.createProcessor();

          try {
            await processor.init();
          } catch (e) {
            console.error("Error initializing processor", e);
            return null;
          }
          videoTrack.pipe(processor).pipe(videoTrack.processorDestination);
        }
      }
      return processor;
    },
    []
  );

  const setBackgroundBlur = useCallback(
    async (videoTrack: ICameraVideoTrack | null) => {
      if (videoTrack) {
        try {
          const processor = await getProcessorInstance(videoTrack);

          processor.setOptions({ type: "blur", blurDegree: 2 });
          await processor.enable();
        } catch (e) {
          console.warn("Failed to enable blur", e);
        }
      }
    },
    []
  );

  const removeBackgroundBlur = useCallback(
    async (videoTrack: ICameraVideoTrack | null) => {
      if (videoTrack) {
        try {
          const processor = await getProcessorInstance(videoTrack);
          processor.disable();
        } catch (e) {
          console.warn("Failed to disable blur", e);
        }
      }
    },
    []
  );

  return {
    setBackgroundBlur,
    removeBackgroundBlur,
  };
};

export default useVirtualBackground;
