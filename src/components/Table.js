import React from 'react';

const Table = ({ data, columns, renderRow }) => {
    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    {columns.map((col, index) => (
                        <th key={index}>{col.header}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((item, index) => renderRow(item, index))}
            </tbody>
        </table>
    );
}

export default Table;
