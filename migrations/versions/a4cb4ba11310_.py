"""empty message

Revision ID: a4cb4ba11310
Revises: f1608c8dfb76
Create Date: 2025-03-18 22:43:55.191024

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = 'a4cb4ba11310'
down_revision = 'f1608c8dfb76'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('medias', schema=None) as batch_op:
        batch_op.alter_column('media_type',
               existing_type=postgresql.ENUM('image', 'videos', 'audio', name='media_type'),
               type_=sa.String(),
               existing_nullable=False)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('medias', schema=None) as batch_op:
        batch_op.alter_column('media_type',
               existing_type=sa.String(),
               type_=postgresql.ENUM('image', 'videos', 'audio', name='media_type'),
               existing_nullable=False)

    # ### end Alembic commands ###
