export const LoadingIcon = () => {
  return (
    <svg
      width={36}
      height={36}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 200"
    >
      <circle r="22" cx="40" cy="65">
        <animate
          attributeName="cy"
          calcMode="spline"
          dur="0.7"
          values="65;135;65;"
          keySplines=".5 0 .5 1;.5 0 .5 1"
          repeatCount="indefinite"
          begin="-.4"
        />
      </circle>
      <circle r="22" cx="100" cy="65">
        <animate
          attributeName="cy"
          calcMode="spline"
          dur="0.7"
          values="65;135;65;"
          keySplines=".5 0 .5 1;.5 0 .5 1"
          repeatCount="indefinite"
          begin="-.2"
        />
      </circle>
      <circle r="22" cx="160" cy="65">
        <animate
          attributeName="cy"
          calcMode="spline"
          dur="0.7"
          values="65;135;65;"
          keySplines=".5 0 .5 1;.5 0 .5 1"
          repeatCount="indefinite"
          begin="0"
        />
      </circle>
    </svg>
  );
};
