import { test, expect } from "@playwright/test";

test.describe("Shivlilamrit ebook", () => {
  test("reads cover, contents, and adhyay stories as a simple document", async ({ page }) => {
    await page.goto("/shivlilamrit");
    await expect(page).toHaveTitle(/Shivlilamrit/);
    await expect(page.getByRole("heading", { name: /श्रीशिवलीलामृत/ })).toBeVisible();
    await expect(page.getByRole("heading", { name: /अनुक्रमणिका/ })).toBeVisible();
    await expect(page.getByRole("heading", { name: /Download the free PDF/i })).toBeVisible();
    await expect(page.getByTestId("ebook-pdf-en")).toHaveAttribute(
      "href",
      "/ebook/Shivlilamrut_Kathasar_Adhyay_1_to_15.pdf"
    );
    await expect(page.getByRole("heading", { name: /Buy the print Kathasar/i })).toBeVisible();
    await expect(page.getByTestId("print-shop-amazon-in")).toHaveAttribute("href", /amazon\.in/);
    const pothiHref = await page
      .getByRole("link", { name: /Open the pothi/i })
      .getAttribute("href");
    expect(pothiHref).toBeTruthy();
    await page.goto(pothiHref ?? "/shivlilamrit/book?p=1");
    await expect(page.getByRole("heading", { name: /सचित्र श्रीशिवलीलामृत/ })).toBeVisible();
    await expect(page.getByRole("button", { name: /Start adhyay 1/i })).toBeVisible();
    await page.getByTestId("pothi-listen").click();
    await expect(page.getByRole("button", { name: /Pause/i })).toBeVisible();
    await page.getByTestId("pothi-listen").click();
    await page.getByRole("button", { name: /Contents/i }).click();
    await expect(page.getByText("* अनुक्रमणिका *")).toBeVisible();
    await expect(page.getByRole("button", { name: /अध्याय १ ·/ })).toBeVisible();
    await expect(page.getByText(/पृष्ठ/)).toBeVisible();
    await page.getByTestId("pothi-jump").fill("4");
    await page.getByRole("button", { name: /Jump to page/i }).click();
    await expect(page.getByText("॥ अध्याय ४ ॥")).toBeVisible();
    await page.getByRole("button", { name: /Contents/i }).click();
    await page.goto("/shivlilamrit/book?p=10");
    await expect(page.getByText(/ॐ नमोजी शिवा/)).toBeVisible();
    await expect(page.getByText(/No ovis on this leaf/)).toHaveCount(0);
    await page.goto("/shivlilamrit");
    await page
      .getByRole("link", { name: /अध्याय ११/ })
      .first()
      .click();
    await expect(page).toHaveURL(/\/shivlilamrit\/book\?p=/);
    await expect(page.getByRole("heading", { name: /रुद्राक्ष/ })).toBeVisible();
    await page.getByTestId("pothi-next").click();
    await expect(page.getByText(/धन्य धन्य तेचि जन/)).toBeVisible();
  });

  test("Mahadeva section names disputes instead of fake temples", async ({ page }) => {
    await page.goto("/mahadev");
    await expect(page.getByRole("heading", { name: /Shiva as the tradition/i })).toBeVisible();
    await page
      .getByRole("link", { name: /Somnath/i })
      .first()
      .click();
    await expect(page.getByText(/Artist impression/i)).toBeVisible();
    await page.goto("/mahadev/vaidyanath");
    await expect(page.getByText("Vaijnath · Parli, Maharashtra")).toBeVisible();
    await page.goto("/mahadev/nageshwar");
    await expect(page.getByText("Aundha Nagnath · Hingoli district, Maharashtra")).toBeVisible();
  });
});
