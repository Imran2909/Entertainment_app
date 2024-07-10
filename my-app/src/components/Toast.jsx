import { Wrap,WrapItem,Button } from '@chakra-ui/react'
import useToast from "@chakra-ui/toast"


function Toast() {
    const toast = useToast()
    const positions = [
      'top',
      'top-right',
      'top-left',
      'bottom',
      'bottom-right',
      'bottom-left',
    ]
  return (
    <div>
       <Wrap>
        {positions.map((position, i) => (
          <WrapItem key={i}>
            <Button
              onClick={() =>
                toast({
                  title: `top toast`,
                  position: position,
                  isClosable: true,
                })
              }
            >
              Show {position} toast
            </Button>
          </WrapItem>
        ))}
      </Wrap>
    </div>
  )
}


