import React, { cloneElement, Component, PropTypes } from 'react';
import classnames from 'classnames';
import { themr } from 'react-css-themr';
import { TABLE } from '../identifiers.js';
import InjectCheckbox from '../checkbox/Checkbox.js';
import InjectTableCell from './TableCell.js';

const factory = (Checkbox, TableCell) => {
  class TableRow extends Component {
    static propTypes = {
      children: PropTypes.node,
      className: PropTypes.string,
      idx: PropTypes.number,
      onSelect: PropTypes.func,
      selectable: PropTypes.bool,
      selected: PropTypes.bool,
      theme: PropTypes.shape({
        checkboxCell: PropTypes.string,
        row: PropTypes.string,
        selected: PropTypes.string
      })
    };

    handleSelect = value => {
      const { idx, onSelect } = this.props;
      if (onSelect) onSelect(idx, value);
    };

    render () {
      const { children, className, selectable, idx, selected, theme, ...other } = this.props; // eslint-disable-line
      const _className = classnames(theme.row, {
        [theme.selected]: selectable && selected
      }, className);
      return (
        <tr {...other} className={_className}>
          {selectable && <TableCell className={theme.checkboxCell}>
            <Checkbox checked={selected} onChange={this.handleSelect} />
          </TableCell>}
          {React.Children.map(children, (child, index) => cloneElement(child, {
            column: index,
            tagName: 'td'
          }))}
        </tr>
      );
    }
  }

  return TableRow;
};

const TableRow = factory(InjectCheckbox, InjectTableCell);
export default themr(TABLE)(TableRow);
export { factory as tableRowFactory };
export { TableRow };
