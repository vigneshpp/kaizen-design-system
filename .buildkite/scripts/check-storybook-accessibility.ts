import AxePuppeteer from "axe-puppeteer"
import puppeteer from "puppeteer"
const passableViolationCount = 2079

const getExamples = async page => {
  const handle = await page.evaluateHandle(() => ({ window, document }))
  const properties = await handle.getProperties()
  const windowHandle = properties.get("window")
  const clientApiHandle = await (await windowHandle.getProperties()).get(
    "__STORYBOOK_CLIENT_API__"
  )
  const getStorybook = await clientApiHandle.evaluate(clientApi =>
    clientApi.getStorybook()
  )

  const result = []
  getStorybook.forEach(story => {
    const { kind } = story
    story.stories.forEach(example => {
      const { name } = example
      result.push({
        kind,
        name,
      })
    })
  })
  return result
}

const asyncForEach = async (array, callback) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array)
  }
}

type ExampleWithViolations = {
  url: string
  violations: Array<{}>
}

const examplesWithViolations = async (
  storybookExampleUrls,
  page
): Promise<ExampleWithViolations[]> => {
  const axePuppeteerInstance = new AxePuppeteer(page)
  const result = []
  await asyncForEach(storybookExampleUrls, async url => {
    await page.goto(url)
    const analysis = await axePuppeteerInstance.analyze()
    if (analysis.violations.length > 0) {
      result.push({ url, violations: analysis.violations })
    }
  })
  return result
}

const main = async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.setBypassCSP(true)

  const baseIframeUrl = "http://localhost:57357/iframe.html"
  await page.goto(`${baseIframeUrl}?id=table-elm--default`)

  const storybookExamples = await getExamples(page)
  const storybookExampleUrls = storybookExamples.map(({ kind, name }) => {
    return `${baseIframeUrl}?selectedKind=${encodeURIComponent(
      kind
    )}&selectedStory=${encodeURIComponent(name)}`
  })

  const examples: ExampleWithViolations[] = await examplesWithViolations(
    storybookExampleUrls,
    page
  )

  const violationCount = examples.reduce(
    (tally, example) => tally + example.violations.length,
    0
  )

  await page.close()
  await browser.close()

  if (violationCount > passableViolationCount) {
    console.log("Accessibility violations found:")
    examples.forEach(example => {
      console.log(example)
    })
    console.log(
      `More accessibility violations were found than the current allowable limit of ${passableViolationCount}. This likely means that a new accessibility violation has been added to the code base.`
    )
    process.exit(1)
  } else {
    console.log("No accessibility violations found")
    process.exit(0)
  }
}

main()
