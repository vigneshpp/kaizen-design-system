import { cleanup, render } from "@testing-library/react"
import * as React from "react"
import { ConfirmationModal } from "./index"

afterEach(cleanup)

describe("<Box />", () => {
  it("renders the correct classes for a default box", () => {
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
    expect(getByText("Additional subtext")).toEqual(true)
  })
})
