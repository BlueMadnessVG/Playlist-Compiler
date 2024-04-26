import React from "react";
import ArrowLeftIcon from "../../assets/icons/arrowLeft";
import ArrowRightIcon from "../../assets/icons/arrowRight";
import YouTubeIcon from "../../assets/icons/youtube";

function PageHeader() {
  return (
    <div className="relative flex z-10 px-6 pt-6 justify-between">
      <div className="flex flex-row gap-2">
        <button className="p-1 bg-slate-800/70 rounded-full ">
          <ArrowLeftIcon />
        </button>
        <button className="p-1 bg-slate-800/70 rounded-full ">
          <ArrowRightIcon />
        </button>
      </div>

      <div className="flex flex-row gap-2">
        <button className="">
          <YouTubeIcon />
        </button>
      </div>
    </div>
  );
}

export default PageHeader;
