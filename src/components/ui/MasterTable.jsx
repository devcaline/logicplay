import TruthLamp from './TruthLamp.jsx';
import { LeverArt } from './LeverMachine.jsx';
import './MasterTable.css';

/**
 * Tabela-verdade ilustrada: cada linha é uma combinação de duas alavancas,
 * cada coluna de resultado é uma porta lógica (E, OU...) com lâmpadas.
 *
 * answers: { [columnId]: { [rowIndex]: boolean } }
 * current: { column, row } da casa da vez (pisca)
 */
export default function MasterTable({ rows, columns, levers, answers = {}, current = null, wrong = null, solved = false, small = false }) {
  return (
    <div className={`master-table ${solved ? 'is-solved' : ''} ${small ? 'master-table--small' : ''}`} role="table" aria-label="Tabela Mestra">
      <div className="master-table__title" aria-hidden="true">Tabela Mestra</div>
      <div className="master-table__grid" style={{ gridTemplateColumns: `repeat(2, minmax(0, 1fr)) 10px repeat(${columns.length}, minmax(0, 1fr))` }}>
        <span className="master-table__head master-table__head--a" role="columnheader">{levers.a.label}</span>
        <span className="master-table__head master-table__head--b" role="columnheader">{levers.b.label}</span>
        <span aria-hidden="true" />
        {columns.map((column) => (
          <span key={column.id} className={`master-table__head master-table__head--gate ${current?.column === column.id ? 'is-active' : ''}`} role="columnheader">
            {column.gate}
          </span>
        ))}

        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className={`master-table__row ${current?.row === rowIndex ? 'is-active' : ''}`} role="row">
            {['a', 'b'].map((key) => (
              <span key={key} className="master-table__cell master-table__cell--input" role="cell" aria-label={`${levers[key].label}: ${row[key] ? 'ligada' : 'desligada'}`}>
                <LeverArt on={row[key]} color={row[key] ? '#33B877' : '#C9C5D6'} className="master-table__lever" />
              </span>
            ))}
            <span aria-hidden="true" className="master-table__divider" />
            {columns.map((column) => {
              const value = answers[column.id]?.[rowIndex];
              const isCurrent = current?.column === column.id && current?.row === rowIndex;
              const isWrong = wrong?.column === column.id && wrong?.row === rowIndex;
              return (
                <span
                  key={column.id}
                  className={`master-table__cell master-table__cell--result ${isCurrent ? 'is-current' : ''} ${isWrong ? 'is-wrong' : ''}`}
                  role="cell"
                  aria-label={`${column.gate}: ${value === undefined ? 'sem resposta' : value ? 'acende' : 'apaga'}`}
                >
                  <TruthLamp state={value === undefined ? 'unset' : value ? 'on' : 'off'} size={small ? 26 : 38} flash={solved && value} />
                </span>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
