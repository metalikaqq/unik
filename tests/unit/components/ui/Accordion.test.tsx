import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/Accordion";

function renderTriple(props: { singleOpen?: boolean } = {}) {
  return render(
    <Accordion {...props}>
      <AccordionItem itemId="one">
        <AccordionTrigger>Trigger 1</AccordionTrigger>
        <AccordionContent>Body 1</AccordionContent>
      </AccordionItem>
      <AccordionItem itemId="two">
        <AccordionTrigger>Trigger 2</AccordionTrigger>
        <AccordionContent>Body 2</AccordionContent>
      </AccordionItem>
      <AccordionItem itemId="three">
        <AccordionTrigger>Trigger 3</AccordionTrigger>
        <AccordionContent>Body 3</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

function getTriggers(): [HTMLElement, HTMLElement, HTMLElement] {
  const all = screen.getAllByRole("button");
  if (all.length < 3) throw new Error(`expected 3 triggers, got ${all.length}`);
  return [all[0]!, all[1]!, all[2]!];
}

describe("<Accordion />", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders all triggers as buttons with correct ARIA wiring", () => {
    renderTriple();
    const triggers = screen.getAllByRole("button");
    expect(triggers).toHaveLength(3);
    for (const trigger of triggers) {
      expect(trigger).toHaveAttribute("aria-expanded", "false");
      expect(trigger).toHaveAttribute("aria-controls");
      expect(trigger.getAttribute("id")).toBeTruthy();
    }
  });

  it("ARIA: trigger.aria-controls points to a region with matching id and aria-labelledby pointing back", () => {
    renderTriple();
    const trigger1 = screen.getByRole("button", { name: "Trigger 1" });
    const controlsId = trigger1.getAttribute("aria-controls");
    expect(controlsId).toBeTruthy();
    const region = document.getElementById(controlsId as string);
    expect(region).not.toBeNull();
    expect(region?.getAttribute("aria-labelledby")).toBe(trigger1.id);
  });

  it("clicking a trigger toggles aria-expanded and reveals content", () => {
    renderTriple();
    const trigger = screen.getByRole("button", { name: "Trigger 1" });
    expect(trigger).toHaveAttribute("aria-expanded", "false");

    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    const region = document.getElementById(trigger.getAttribute("aria-controls") as string);
    expect(region?.hasAttribute("hidden")).toBe(false);

    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(region?.hasAttribute("hidden")).toBe(true);
  });

  it("triggers are native <button> elements (Enter/Space toggle via browser semantics)", () => {
    renderTriple();
    const triggers = screen.getAllByRole("button");
    for (const trigger of triggers) {
      expect(trigger.tagName).toBe("BUTTON");
      expect(trigger.getAttribute("type")).toBe("button");
    }
  });

  it("ArrowDown moves focus to the next trigger and wraps from last to first", () => {
    renderTriple();
    const [t1, t2, t3] = getTriggers();
    t1.focus();
    expect(document.activeElement).toBe(t1);
    fireEvent.keyDown(t1, { key: "ArrowDown" });
    expect(document.activeElement).toBe(t2);
    fireEvent.keyDown(t2, { key: "ArrowDown" });
    expect(document.activeElement).toBe(t3);
    fireEvent.keyDown(t3, { key: "ArrowDown" });
    expect(document.activeElement).toBe(t1);
  });

  it("ArrowUp moves focus to the previous trigger and wraps from first to last", () => {
    renderTriple();
    const [t1, t2, t3] = getTriggers();
    t1.focus();
    fireEvent.keyDown(t1, { key: "ArrowUp" });
    expect(document.activeElement).toBe(t3);
    fireEvent.keyDown(t3, { key: "ArrowUp" });
    expect(document.activeElement).toBe(t2);
  });

  it("Home jumps focus to the first trigger; End jumps to the last", () => {
    renderTriple();
    const [t1, t2, t3] = getTriggers();
    t2.focus();
    fireEvent.keyDown(t2, { key: "End" });
    expect(document.activeElement).toBe(t3);
    fireEvent.keyDown(t3, { key: "Home" });
    expect(document.activeElement).toBe(t1);
  });

  it("singleOpen (default true): opening a second item closes the first", () => {
    renderTriple();
    const [t1, t2] = getTriggers();
    fireEvent.click(t1);
    expect(t1).toHaveAttribute("aria-expanded", "true");
    fireEvent.click(t2);
    expect(t1).toHaveAttribute("aria-expanded", "false");
    expect(t2).toHaveAttribute("aria-expanded", "true");
  });

  it("singleOpen={false}: multiple items can be open simultaneously", () => {
    renderTriple({ singleOpen: false });
    const [t1, t2] = getTriggers();
    fireEvent.click(t1);
    fireEvent.click(t2);
    expect(t1).toHaveAttribute("aria-expanded", "true");
    expect(t2).toHaveAttribute("aria-expanded", "true");
  });

  it("content region has role='region' and is hidden when collapsed", () => {
    renderTriple();
    const trigger = screen.getByRole("button", { name: "Trigger 1" });
    const regionId = trigger.getAttribute("aria-controls") as string;
    const region = document.getElementById(regionId);
    expect(region).not.toBeNull();
    expect(region?.getAttribute("role")).toBe("region");
    expect(region?.hasAttribute("hidden")).toBe(true);
  });

  it("trigger has the focus-visible accent outline classes from ADR-0002", () => {
    renderTriple();
    const trigger = screen.getByRole("button", { name: "Trigger 1" });
    expect(trigger.className).toMatch(/focus-visible:outline-2/);
    expect(trigger.className).toMatch(/focus-visible:outline-offset-4/);
    expect(trigger.className).toMatch(/focus-visible:outline-accent/);
  });

  it("ArrowDown is ignored when focus is not on an accordion trigger", () => {
    render(
      <div>
        <button data-testid="outside">outside</button>
        <Accordion>
          <AccordionItem itemId="x">
            <AccordionTrigger>X</AccordionTrigger>
            <AccordionContent>Body X</AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    );
    const outside = screen.getByTestId("outside");
    outside.focus();
    fireEvent.keyDown(outside, { key: "ArrowDown" });
    expect(document.activeElement).toBe(outside);
  });

  it("renders independent ARIA ids when multiple Accordions coexist", () => {
    render(
      <>
        <Accordion>
          <AccordionItem itemId="dup">
            <AccordionTrigger>A</AccordionTrigger>
            <AccordionContent>BodyA</AccordionContent>
          </AccordionItem>
        </Accordion>
        <Accordion>
          <AccordionItem itemId="dup">
            <AccordionTrigger>B</AccordionTrigger>
            <AccordionContent>BodyB</AccordionContent>
          </AccordionItem>
        </Accordion>
      </>
    );
    const triggers = screen.getAllByRole("button");
    const ids = triggers.map((t) => t.id);
    // both accordions used itemId="dup"; ids should differ because they're scoped per Accordion
    expect(new Set(ids).size).toBe(triggers.length);
  });
});
