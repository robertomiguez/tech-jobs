import ClipLoader from 'react-spinners/ClipLoader';
import { CSSProperties } from 'react';

const override: CSSProperties = {
  display: 'block',
  margin: '0 auto',
  borderColor: 'blue',
};

const Spinner = ({ loading }: { loading: boolean }) => {
  return (
    <ClipLoader
      color="#433333"
      loading={loading}
      size={150}
      cssOverride={override}
      data-testid="spinner"
    />
  );
};
export default Spinner;
