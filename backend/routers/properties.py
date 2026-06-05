from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

import models

from database import get_db
from schemas import (
    PropertyCreate,
    PropertyUpdate,
    PropertyResponse
)

router = APIRouter(
    prefix="/properties",
    tags=["Properties"]
)



@router.get("/", response_model=list[PropertyResponse])
def get_properties(db: Session = Depends(get_db)):

    return db.query(models.Property).all()


@router.get("/{property_id}", response_model=PropertyResponse)
def get_property(
    property_id: int,
    db: Session = Depends(get_db)
):

    property_item = (
        db.query(models.Property)
        .filter(models.Property.id == property_id)
        .first()
    )

    if not property_item:
        raise HTTPException(
            status_code=404,
            detail="Property not found"
        )

    return property_item


@router.post(
    "/",
    response_model=PropertyResponse,
    status_code=201
)
def create_property(
    property: PropertyCreate,
    db: Session = Depends(get_db)
):

    new_property = models.Property(
        title=property.title
    )

    db.add(new_property)

    db.commit()

    db.refresh(new_property)

    return new_property

   


@router.put("/{property_id}", response_model=PropertyResponse)
def update_property(
    property_id: int,
    property: PropertyUpdate,
    db: Session = Depends(get_db)
):

    property_item = (
        db.query(models.Property)
        .filter(models.Property.id == property_id)
        .first()
    )

    if not property_item:
        raise HTTPException(
            status_code=404,
            detail="Property not found"
        )

    property_item.title = property.title

    db.commit()

    db.refresh(property_item)

    return property_item


@router.delete("/{property_id}")
def delete_property(
    property_id: int,
    db: Session = Depends(get_db)
):

    property_item = (
        db.query(models.Property)
        .filter(models.Property.id == property_id)
        .first()
    )

    if not property_item:
        raise HTTPException(
            status_code=404,
            detail="Property not found"
        )
    db.delete(property_item)

    db.commit()

    return {
        "message": "Property deleted"
    }