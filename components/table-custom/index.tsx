/**
 * MUI
 **/
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Box } from '@mui/material'

import { TableProps } from '@type/global/table'

interface Props {
  headers: TableProps[][]
  rows: TableProps[][]
  borderColor?: string
  tableHeadBgColor?: string
  tableHeadFontColor?: string
  isAlternate?: boolean
}

export default function TableCustom({
  headers,
  rows,
  borderColor = '#dddddd',
  tableHeadBgColor = 'primary.main',
  tableHeadFontColor = 'white',
  isAlternate = false
}: Props) {
  const tableContainer = {
    backgroundColor: 'white'
  }
  const tableHeadCustom = {
    backgroundColor: tableHeadBgColor,
    color: tableHeadFontColor,
    'td,th': { color: tableHeadFontColor }
  }
  const tableBodyCustom = {
    backgroundColor: 'white'
  }
  const tableRowCustom = {
    'td,th': { border: `1px solid ${borderColor}` }
  }

  const tableHeaderAlternate = {
    'td,th': { border: 'none' }
  }
  const tableRowAlternate = {
    '&:nth-of-type(odd)': {
      backgroundColor: '#f1f2f6',
      border: 'none'
    },
    'td,th': { border: 'none' }
  }

  return (
    <>
      <TableContainer component={Box} sx={tableContainer}>
        <Table aria-label="table">
          <TableHead sx={tableHeadCustom}>
            {headers.map((header, idx) => (
              <TableRow key={idx} sx={[tableRowCustom, isAlternate && tableHeaderAlternate]}>
                {header.map(({ text, props, isSticky, style }, headerIdx) => (
                  <TableCell
                    {...props}
                    style={
                      isSticky
                        ? {
                            position: 'sticky',
                            left: 0,
                            backgroundColor: '#01AA8D',
                            color: 'white',
                            zIndex: 99
                          }
                        : style
                    }
                    key={`TableHead-${text}-${headerIdx}`}
                  >
                    {text}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody sx={tableBodyCustom}>
            {rows.map((row, idx) => (
              <TableRow key={idx} sx={[tableRowCustom, isAlternate && tableRowAlternate]}>
                {row.map(({ text, props, isSticky, style }, rowIdx) => (
                  <TableCell
                    {...props}
                    style={
                      isSticky
                        ? {
                            position: 'sticky',
                            left: 0,
                            zIndex: 99,
                            backgroundColor: 'white'
                          }
                        : style
                    }
                    key={`TableBody-${text}-${rowIdx}`}
                  >
                    {text}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}
