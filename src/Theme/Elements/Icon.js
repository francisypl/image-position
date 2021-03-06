import React, { useState } from "react";
import cx from "classnames";

const crop = (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M14 4H6V2H16V12H14V4ZM4 14V0H2V2H0V4H2V16H14V18H16V16H18V14H4Z"
      fill="white"
    />
  </svg>
);

const square = (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="1"
      y="1"
      width="18"
      height="18"
      rx="1"
      stroke="#444444"
      stroke-width="2"
    />
  </svg>
);

const horizontal = (
  <svg
    width="21"
    height="12"
    viewBox="0 0 21 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="1"
      y="1"
      width="19"
      height="10"
      rx="1"
      stroke="#444444"
      stroke-width="2"
    />
  </svg>
);

const vertical = (
  <svg
    width="13"
    height="20"
    viewBox="0 0 13 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="1"
      y="1"
      width="11"
      height="18"
      rx="1"
      stroke="#444444"
      stroke-width="2"
    />
  </svg>
);

const freeform = (
  <svg
    width="17"
    height="20"
    viewBox="0 0 17 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M15.89 17.01L16.95 8.16001L11 7.27001V3.01001C11 1.36001 9.64998 0.0100098 7.99998 0.0100098C6.34998 0.0100098 4.99998 1.36001 4.99998 3.01001V8.46001L4.40998 8.19001L4.30998 8.15001C2.80998 7.65001 1.18998 8.46001 0.68998 9.96001C0.30998 11.09 0.68998 12.35 1.62998 13.11L6.65998 17H15.89V17.01ZM2.58998 10.6C2.73998 10.16 3.19998 9.92001 3.63998 10.04L6.99998 11.56V3.01001C6.99998 2.46001 7.44998 2.01001 7.99998 2.01001C8.54998 2.01001 8.99998 2.46001 8.99998 3.01001V8.99001L14.73 9.85001L14.11 15.01H7.33998L2.85998 11.55C2.57998 11.32 2.46998 10.94 2.58998 10.6ZM16.03 17.98V19.98L5.99998 20V18L16.03 17.98Z"
      fill="#444444"
    />
  </svg>
);

const close = (
  <svg
    enable-background="new 0 0 413.348 413.348"
    height="16"
    viewBox="0 0 413.348 413.348"
    width="16"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="m413.348 24.354-24.354-24.354-182.32 182.32-182.32-182.32-24.354 24.354 182.32 182.32-182.32 182.32 24.354 24.354 182.32-182.32 182.32 182.32 24.354-24.354-182.32-182.32z" />
  </svg>
);

const image = (
  <svg
    width="19"
    height="15"
    viewBox="0 0 19 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M0 0V14.6667H18.3333V0H0ZM1.66669 1.46667H16.6667V8.74133L13.2084 6.30667L9.38335 10.5087L6.55002 8.514L2.10835 13.2H1.66669V1.46667ZM4.28333 13.2L6.79166 10.5527L9.64999 12.562L13.475 8.36L16.6667 10.6187V13.2H4.28333ZM3.33331 4.4C3.33331 3.59333 4.08331 2.93333 4.99998 2.93333C5.91665 2.93333 6.66665 3.59333 6.66665 4.4C6.66665 5.20666 5.91665 5.86666 4.99998 5.86666C4.08331 5.86666 3.33331 5.20666 3.33331 4.4Z"
      fill="white"
    />
  </svg>
);

const move = (
  <svg
    width="18"
    height="18"
    version="1.1"
    id="Layer_1"
    xmlns="http://www.w3.org/2000/svg"
    x="0px"
    y="0px"
    viewBox="0 0 492.001 492.001"
  >
    <g>
      <g>
        <path
          d="M487.97,237.06l-58.82-58.82c-5.224-5.228-14.376-5.228-19.592,0l-7.436,7.432c-5.4,5.4-5.4,14.064,0,19.46l21.872,21.74
			H265.206V68.396l21.808,22.132c5.224,5.22,14.216,5.22,19.428,0l7.36-7.432c5.404-5.404,5.356-14.196-0.044-19.596L254.846,4.444
			c-2.6-2.592-6.088-4.184-9.804-4.184h-0.404c-3.712,0-7.188,1.588-9.784,4.184l-57.688,57.772
			c-2.612,2.608-4.052,6.124-4.052,9.836c0,3.704,1.44,7.208,4.052,9.816l7.432,7.444c5.224,5.22,14.612,5.228,19.828,0.004
			l22.368-22.132v159.688H67.814l22.14-22.008c2.608-2.608,4.048-6.028,4.048-9.732s-1.44-7.16-4.052-9.76l-7.436-7.42
			c-5.22-5.216-14.372-5.2-19.584,0.008L4.034,236.856c-2.672,2.672-4.1,6.244-4.032,9.92c-0.068,3.816,1.356,7.388,4.028,10.056
			l57.68,57.692c5.224,5.22,14.38,5.22,19.596,0l7.44-7.44c2.604-2.6,4.044-6.084,4.044-9.788c0-3.716-1.44-7.232-4.044-9.836
			l-22.14-22.172H226.79V425.32l-23.336-23.088c-5.212-5.22-14.488-5.22-19.7,0l-7.5,7.44c-2.604,2.6-4.072,6.084-4.072,9.792
			c0,3.704,1.424,7.184,4.028,9.792l58.448,58.456c2.596,2.592,6.068,4.028,9.9,4.028c0.024-0.016,0.24,0,0.272,0
			c3.712,0,7.192-1.432,9.792-4.028l58.828-58.832c2.6-2.604,4.044-6.088,4.044-9.792c0-3.712-1.44-7.192-4.044-9.796l-7.44-7.44
			c-5.216-5.22-14.044-5.22-19.264,0l-21.54,21.868V265.284H425.59l-23.096,23.132c-2.612,2.608-4.048,6.112-4.048,9.82
			s1.432,7.192,4.048,9.8l7.44,7.444c5.212,5.224,14.372,5.224,19.584,0l58.452-58.452c2.672-2.664,4.096-6.244,4.028-9.916
			C492.07,243.296,490.642,239.728,487.97,237.06z"
        />
      </g>
    </g>
    <g />
    <g />
    <g />
    <g />
    <g />
    <g />
    <g />
    <g />
    <g />
    <g />
    <g />
    <g />
    <g />
    <g />
    <g />
  </svg>
);

const check = (
  <svg
    id="Capa_1"
    enable-background="new 0 0 515.556 515.556"
    height="20"
    viewBox="0 0 515.556 515.556"
    width="20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="m0 274.226 176.549 176.886 339.007-338.672-48.67-47.997-290.337 290-128.553-128.552z" />
  </svg>
);

const resize = (
  <svg
    width="16"
    height="16"
    version="1.1"
    id="Capa_1"
    xmlns="http://www.w3.org/2000/svg"
    x="0px"
    y="0px"
    viewBox="0 0 512 512"
  >
    <g>
      <g>
        <path
          d="M492,0H344.212c-11.046,0-20,8.954-20,20s8.954,20,20,20h99.503L283.394,200.322c-7.811,7.811-7.811,20.474,0,28.284
			c7.81,7.81,20.473,7.811,28.284,0L472,68.284v99.503c0,11.046,8.954,20,20,20c11.046,0,20-8.954,20-20V20
			C512,9.115,503.154,0,492,0z"
        />
      </g>
    </g>
    <g>
      <g>
        <path
          d="M228.606,283.394c-7.811-7.81-20.474-7.811-28.284,0L40,443.716v-99.503c0-11.046-8.954-20-20-20s-20,8.954-20,20V492
			c0,10.866,8.853,20,20,20h147.788c11.046,0,20-8.954,20-20c0-11.046-8.954-20-20-20H68.284l160.322-160.322
			C236.417,303.867,236.417,291.204,228.606,283.394z"
        />
      </g>
    </g>
    <g />
    <g />
    <g />
    <g />
    <g />
    <g />
    <g />
    <g />
    <g />
    <g />
    <g />
    <g />
    <g />
    <g />
    <g />
  </svg>
);

const zoomIn = (
  <svg
    width="23"
    height="23"
    viewBox="0 0 33 33"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M17.875 15.3586H15.125V18.1086H12.375V15.3586H9.625V12.6086H12.375V9.85864H15.125V12.6086H17.875V15.3586ZM27.5 29.6587L19.3875 21.4087C15.3456 24.3564 9.71345 23.6824 6.48132 19.8641C3.2492 16.0459 3.51441 10.3797 7.08905 6.88005C10.6637 3.3804 16.3342 3.23537 20.0831 6.54771C23.8319 9.86005 24.3865 15.5053 21.3538 19.4837L29.4525 27.7337L27.5 29.6587ZM13.75 20.5424C15.5291 20.5469 17.2383 19.8503 18.5075 18.6037L18.645 18.4799C20.9374 16.1412 21.2619 12.5102 19.4207 9.80205C17.5795 7.09387 14.0836 6.06029 11.0658 7.33186C8.04791 8.60343 6.34585 11.8271 6.99793 15.0364C7.65 18.2456 10.4752 20.5494 13.75 20.5424V20.5424Z"
      fill="white"
    />
  </svg>
);

const zoomOut = (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M13 9.16997V11.17H7V9.16997H13ZM20 21.57L14.1 15.57C11.1605 17.7137 7.06433 17.2235 4.71369 14.4466C2.36306 11.6697 2.55593 7.54885 5.15568 5.00365C7.75542 2.45845 11.8794 2.35297 14.6059 4.76195C17.3323 7.17093 17.7356 11.2765 15.53 14.17L21.42 20.17L20 21.57ZM10 14.94C11.2939 14.9432 12.5369 14.4366 13.46 13.53L13.56 13.44C15.2272 11.7391 15.4632 9.09839 14.1242 7.12879C12.7851 5.1592 10.2426 4.40751 8.04783 5.33229C5.85303 6.25707 4.61516 8.60159 5.0894 10.9356C5.56364 13.2696 7.61833 14.9451 10 14.94V14.94Z"
      fill="white"
    />
  </svg>
);

const ICON_MAP = {
  crop,
  square,
  horizontal,
  vertical,
  freeform,
  close,
  image,
  move,
  check,
  resize,
  zoomIn,
  zoomOut
};

export function Icon({ name, className, children, ...props }) {
  return (
    <div className={cx("flex-center peak", className)} {...props}>
      <span className={`icon ${name}-icon`}>{ICON_MAP[name]}</span>
      {children}
    </div>
  );
}

export function ToolbarIcon({ children, ...props }) {
  const [show, setShow] = useState(false);
  return (
    <Icon onClick={() => setShow(!show)} {...props}>
      {show && children}
    </Icon>
  );
}
