import { IconClockCode } from "@tabler/icons-react"

type ComingSoonProps = {
  title?: string
  message?: string
}

export function ComingSoon({
  title = 'Coming Soon',
  message = 'This feature is under development. Check back later!',
}: ComingSoonProps) {
  return (
    <div className='w-full min-h-[40vh] flex items-center justify-center px-8 py-10 flex-col text-center gap-3 relative'>
      <IconClockCode className="size-9 sm:size-11" />
      <h2 className='text-3xl text-primary font-extrabold'>{title}</h2>
      <p className='text-sm text-muted-foreground'>{message}</p>
    </div>
  )
}

