import { ConfirmationModal } from "@kaizen/draft-modal"
import { cleanup, render } from "@testing-library/react"
import * as React from "react"

afterEach(cleanup)

describe("<ConfirmationModal />", () => {
  it("test-pack - renders the modal", () => {
    const { getByText } = render(
      <ConfirmationModal
        isOpen={true}
        type="positive"
        title="Positive title"
        onConfirm={close}
        onDismiss={close}
      >
        <div style={{ textAlign: "center" }}>
          Additional subtext to aid the user can be added here.
        </div>
      </ConfirmationModal>
    )
    expect(getByText("Positive title")).toBeTruthy()
  })
})
