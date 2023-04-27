/**
 * MUI
 **/
import { Divider, Box } from '@mui/material'
import {
  Timeline,
  TimelineItem,
  TimelineConnector,
  TimelineOppositeContent,
  TimelineSeparator,
  TimelineContent
} from '@mui/lab'
import { timelineOppositeContentClasses } from '@mui/lab/TimelineOppositeContent'

/**
 * COMPONENTS
 **/
import TimelineDotIcon from '@components/icons/timelineDot'

/**
 * TYPE
 **/
interface Props {
  items: Array<Item>
}
interface Item {
  title: string
  content: React.ReactNode
}
export default function TimelineCustom({ items }: Props) {
  return (
    <Timeline
      sx={{
        [`& .${timelineOppositeContentClasses.root}`]: {
          flex: 0.1
        }
      }}
    >
      {items.map(({ title, content }, idx) => (
        <TimelineItem key={idx} sx={{ minHeight: '150px' }}>
          <TimelineOppositeContent
            variant="h5"
            align="center"
            color="secondary.main"
            sx={{ p: 0, textAlign: 'left', lineHeight: 1, mt: { xs: 0.7, sm: 0.8, md: 0 }, mr: 1 }}
            fontWeight={500}
            fontSize={{ xs: 18, sm: 20, md: '1.7142857142857142rem' }}
          >
            {title}
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDotIcon />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ px: { xs: 1, sm: 3, md: 5 } }}>
            <Box>{content}</Box>
            <Divider sx={{ mt: 3 }} />
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  )
}
