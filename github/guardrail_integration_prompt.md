Act as a QA Engineer.

Before generating any test script, you MUST read and strictly follow all rules and guardrails defined in copilot_instructions.md located in the project root. Reference specific rules from this file in your implementation and comments.

Generate an automated test script for the Checkout feature that:

Follows all coding standards, security guidelines, and guardrails from copilot_instructions.md.
Uses the Page Object Model (POM) pattern as defined in copilot_instructions.md.
Uses best practices for test automation (proper waits, secure credential handling, etc.).
Does not violate any guardrails (e.g., no hardcoded credentials, no static delays, no XPath locators).
Includes comments referencing the relevant copilot_instructions.md rule for each major implementation decision.
Additionally:

If a violation is attempted (e.g., hardcoded password, static delay), explicitly flag it as a guardrail violation in code comments and at runtime.
Clearly explain which rule from copilot_instructions.md is being violated.
Suggest a compliant alternative implementation.
Demonstrate violation flagging both in code comments and, if possible, with runtime checks (e.g., throw an error if a violation is detected).
Optionally, provide instructions for setting up ESLint or other tools for automated flagging.
Your response should include:

The compliant test script (with copilot_instructions.md rule references).
An example of a violating implementation (with explicit guardrail flagging).
A demonstration of how the violation is flagged and corrected according to the guardrails (in comments and/or runtime checks).