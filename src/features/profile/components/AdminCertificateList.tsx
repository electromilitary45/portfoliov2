"use client";

import { useState } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { UpdateCertificateModal } from "@/features/profile/components/UpdateCertificateModal";
import { DeleteCertificateButton } from "@/features/profile/components/DeleteCertificateButton";
import type { Certificate } from "@/features/profile/profile.type";
import { reorderCertificatesAction } from "@/app/actions/profile/reorder-certificates.action";

type AdminCertificateListProps = {
  certificates: Certificate[];
};

function SortableCertificateItem({
  certificate,
}: {
  certificate: Certificate;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: certificate.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <article
      ref={setNodeRef}
      style={style}
      className="grid gap-5 border-b border-white/10 bg-neutral-950 p-5 last:border-b-0 md:grid-cols-[auto_1fr_auto]"
    >
      <button
        type="button"
        className="flex cursor-grab touch-none items-center text-neutral-600 hover:text-white active:cursor-grabbing"
        {...attributes}
        {...listeners}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <circle cx="7" cy="5" r="1.5" />
          <circle cx="13" cy="5" r="1.5" />
          <circle cx="7" cy="10" r="1.5" />
          <circle cx="13" cy="10" r="1.5" />
          <circle cx="7" cy="15" r="1.5" />
          <circle cx="13" cy="15" r="1.5" />
        </svg>
      </button>

      <div>
        <h3 className="text-xl font-semibold text-white">
          {certificate.title}
        </h3>

        <p className="mt-1 font-mono text-xs uppercase tracking-[0.2em] text-red-500">
          {certificate.issuer} — {certificate.year}
        </p>

        <div className="mt-2 flex flex-wrap gap-3">
          {certificate.fileUrl ? (
            <a
              href={certificate.fileUrl}
              target="_blank"
              className="text-sm text-neutral-400 underline underline-offset-4 transition hover:text-white"
            >
              Ver archivo
            </a>
          ) : null}

          {certificate.linkUrl ? (
            <a
              href={certificate.linkUrl}
              target="_blank"
              className="text-sm text-neutral-400 underline underline-offset-4 transition hover:text-white"
            >
              Ver enlace
            </a>
          ) : null}
        </div>
      </div>

      <div className="flex flex-col items-start gap-3 md:items-end md:justify-center">
        <div className="flex flex-wrap gap-2 md:justify-end">
          <UpdateCertificateModal certificate={certificate} />
          <DeleteCertificateButton
            certificateId={certificate.id}
            title={certificate.title}
          />
        </div>
      </div>
    </article>
  );
}

export function AdminCertificateList({
  certificates: initialCertificates,
}: AdminCertificateListProps) {
  const [certificates, setCertificates] = useState(initialCertificates);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = certificates.findIndex((c) => c.id === active.id);
    const newIndex = certificates.findIndex((c) => c.id === over.id);

    const reordered = arrayMove(certificates, oldIndex, newIndex);
    setCertificates(reordered);

    const items = reordered.map((c, i) => ({
      id: c.id,
      sortOrder: i,
    }));

    try {
      await reorderCertificatesAction(items);
    } catch {
      setCertificates(initialCertificates);
    }
  }

  if (certificates.length === 0) {
    return (
      <div className="bg-neutral-950 p-10 text-center">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-neutral-600">
          No hay certificados registrados
        </p>
        <p className="mt-2 text-sm text-neutral-500">
          Crea tu primer certificado usando el botón de arriba.
        </p>
      </div>
    );
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={certificates.map((c) => c.id)}
        strategy={verticalListSortingStrategy}
      >
        {certificates.map((certificate) => (
          <SortableCertificateItem
            key={certificate.id}
            certificate={certificate}
          />
        ))}
      </SortableContext>
    </DndContext>
  );
}
