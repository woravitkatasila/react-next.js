/**
 * MUI
 **/
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material'

/**
 * COMPONENTS
 **/
import ArrowDownIcon from '@components/icons/arrowDown'

/**
 * TYPE
 **/
interface Props {
  title: React.ReactNode
  children?: React.ReactNode
  contentPadding?: string
  hasShadowLine?: boolean
}

export default function AccordionCustom({ title, children, contentPadding, hasShadowLine = true }: Props) {
  return (
    <Accordion sx={accordionCustom}>
      <AccordionSummary
        sx={{ px: { xs: 2, sm: 5 }, columnGap: 3 }}
        aria-controls="panel1a-content"
        id="panel1a-header"
        expandIcon={<ArrowDownIcon color="#0B5D99" />}
      >
        <Typography variant="body1" component="h3" fontWeight={500} color="secondary.main">
          {title}
        </Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ p: 0 }}>
        {hasShadowLine && <Box sx={shadowLine}></Box>}
        <Box sx={{ p: contentPadding || { xs: 2, sm: 4, md: 5 } }}>{children}</Box>
      </AccordionDetails>
    </Accordion>
  )
}

const accordionCustom = {
  boxShadow: 'none',
  '&::before': {
    backgroundColor: 'white'
  }
}

const shadowLine = {
  height: '1px',
  backgroundColor: '#f1f2f6',
  boxShadow: '3px 3px 7px 1px rgba(112, 113, 115, 0.22)',
  width: '100%'
}
