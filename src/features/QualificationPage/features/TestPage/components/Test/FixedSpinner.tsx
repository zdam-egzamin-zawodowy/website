import Spinner, { CENTER_SPINNER } from 'common/Spinner/Spinner';

const FixedSpinner = () => {
  return (
    <Spinner
      containerProps={{
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        bgcolor: 'rgba(0,0,0,.8)',
        zIndex: 1500,
        position: 'fixed',
        color: '#fff',
        ...CENTER_SPINNER,
      }}
      description="Trwa losowanie pytań..."
    />
  );
};

export default FixedSpinner;
