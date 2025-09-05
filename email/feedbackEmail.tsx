import {
  Html,
  Head,
  Font,
  Preview,
  Heading,
  Row,
  Section,
  Text,
  Button,
} from '@react-email/components';

interface FeedBackProps {
  Name: string;
  email: string;
  subject:string;
  comment:string;
}

export default function FeedBackEmail({ Name , email , subject , comment }: FeedBackProps) {
  return (
    <Html lang="en" dir="ltr">
      <Head>
        <title>feedback </title>
        <Font
          fontFamily="Roboto"
          fallbackFontFamily="Verdana"
          webFont={{
            url: 'https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2',
            format: 'woff2',
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>
      <Preview>Here&apos;s feedback </Preview>
      <Section>
        <Row>
          <Heading as="h2">feedback email from {Name}</Heading>
        </Row>
        <Row>
          <Text>subject :{subject}
            
          </Text>
        </Row>
        <Row>
          <Text>sender email is{ email}</Text> 
        </Row>
        <Row>
          <Text>
            {comment}
            {/* If you did not request this code, please ignore this email. */}
          </Text>
        </Row>
        {/* <Row>
          <Button
            href={`http://localhost:3000/verify/${username}`}
            style={{ color: '#61dafb' }}
          >
            Verify here
          </Button>
        </Row> */}
      </Section>
    </Html>
  );
}