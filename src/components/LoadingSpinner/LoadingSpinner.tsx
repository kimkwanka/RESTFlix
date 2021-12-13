import { useAppSelector } from '#state/hooks';

import './LoadingSpinner.scss';

const LoadingSpinner = () => {
  const isRequestPending = useAppSelector((state) => state.ui.isRequestPending);

  return isRequestPending ? <div className="loading-spinner" /> : null;
};

export default LoadingSpinner;
