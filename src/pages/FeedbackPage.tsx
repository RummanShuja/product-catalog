import { useState } from "react";
import type { FormEvent } from "react";
import {
  Box,
  Button,
  Field,
  Heading,
  Input,
  NativeSelect,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router";
import { useAppDispatch } from "../app/hooks";
import { addFeedback } from "../features/feedback/feedbackSlice";

interface FormErrors {
  name?: string;
  rating?: string;
  message?: string;
}

export default function FeedbackPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [rating, setRating] = useState("5");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors: FormErrors = {};
    const numericRating = Number(rating);

    if (!name.trim()) nextErrors.name = "Please enter your name.";
    if (
      !Number.isInteger(numericRating) ||
      numericRating < 1 ||
      numericRating > 5
    ) {
      nextErrors.rating = "Please select a rating from 1 to 5.";
    }
    if (!message.trim()) nextErrors.message = "Please enter your feedback.";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    dispatch(
      addFeedback({
        id: crypto.randomUUID(),
        name: name.trim(),
        rating: numericRating,
        message: message.trim(),
        createdAt: new Date().toISOString(),
      }),
    );

    // The store subscription saves feedback before we navigate.
    navigate("/feedbacks");
  }

  return (
    <Stack maxW="620px" mx="auto" gap={6}>
      <Box>
        <Text
          color="teal.700"
          fontWeight="semibold"
          fontSize="sm"
          letterSpacing="wide"
          mb={2}
        >
          WE'RE LISTENING
        </Text>
        <Heading as="h1" size="3xl" mb={3}>
          A little feedback goes a long way.
        </Heading>
        <Text color="gray.600" lineHeight="1.8">
          How was your experience? Tell us what you liked or what could be
          better.
        </Text>
      </Box>

      <Box
        bg="white"
        p={{ base: 5, md: 8 }}
        borderWidth="1px"
        borderColor="gray.200"
        rounded="xl"
      >
        <form onSubmit={handleSubmit} noValidate>
          <Stack gap={5}>
            <Field.Root invalid={Boolean(errors.name)} required>
              <Field.Label htmlFor="feedback-name">
                Your name <Field.RequiredIndicator />
              </Field.Label>
              <Input
                id="feedback-name"
                name="name"
                autoComplete="name"
                placeholder="Enter your name"
                maxLength={60}
                value={name}
                onChange={(event) => setName(event.currentTarget.value)}
                aria-describedby={
                  errors.name ? "feedback-name-error" : undefined
                }
              />
              <Field.ErrorText id="feedback-name-error">
                {errors.name}
              </Field.ErrorText>
            </Field.Root>

            <Field.Root invalid={Boolean(errors.rating)} required>
              <Field.Label htmlFor="feedback-rating">
                Your rating <Field.RequiredIndicator />
              </Field.Label>
              <NativeSelect.Root>
                <NativeSelect.Field
                  id="feedback-rating"
                  name="rating"
                  value={rating}
                  onChange={(event) => setRating(event.currentTarget.value)}
                  aria-describedby={
                    errors.rating ? "feedback-rating-error" : undefined
                  }
                >
                  <option value="5">5 — Excellent</option>
                  <option value="4">4 — Good</option>
                  <option value="3">3 — Okay</option>
                  <option value="2">2 — Could be better</option>
                  <option value="1">1 — Poor</option>
                </NativeSelect.Field>
                <NativeSelect.Indicator />
              </NativeSelect.Root>
              <Field.ErrorText id="feedback-rating-error">
                {errors.rating}
              </Field.ErrorText>
            </Field.Root>

            <Field.Root invalid={Boolean(errors.message)} required>
              <Field.Label htmlFor="feedback-message">
                Your feedback <Field.RequiredIndicator />
              </Field.Label>
              <Textarea
                id="feedback-message"
                name="message"
                placeholder="Share your thoughts…"
                rows={5}
                maxLength={1000}
                value={message}
                onChange={(event) => setMessage(event.currentTarget.value)}
                aria-describedby={
                  errors.message ? "feedback-message-error" : undefined
                }
              />
              <Field.ErrorText id="feedback-message-error">
                {errors.message}
              </Field.ErrorText>
            </Field.Root>

            <Text fontSize="sm" color="gray.600">
              Feedback is saved in this browser. You can revisit it from Saved
              feedback.
            </Text>
            <Button type="submit" colorPalette="teal" size="lg">
              Submit feedback
            </Button>
            <Link to="/feedbacks" className="text-link">
              View saved feedback →
            </Link>
          </Stack>
        </form>
      </Box>
    </Stack>
  );
}
