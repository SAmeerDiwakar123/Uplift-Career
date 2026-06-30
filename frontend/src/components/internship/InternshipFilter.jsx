import InternshipFilterMegaDropdown from './InternshipFilterMegaDropdown';
import InternshipFilterDrawer from './InternshipFilterDrawer';

const InternshipFilter = ({ isOpen, onClose, variant = 'drawer' }) => {
  if (variant === 'mega') {
    return <InternshipFilterMegaDropdown isOpen={isOpen} onClose={onClose} />;
  }
  return <InternshipFilterDrawer isOpen={isOpen} onClose={onClose} />;
};

export default InternshipFilter;